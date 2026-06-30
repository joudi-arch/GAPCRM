import { readdir, readFile, stat } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const violations = []

async function walk(directory) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name)
    const info = await stat(path)
    if (info.isDirectory()) await walk(path)
    else {
      const extension = extname(path)
      const limit = extension === '.glb' ? 3_145_728 : extension === '.webp' ? 256_000 : null
      if (limit && info.size > limit) violations.push(`${relative(root, path)}: ${info.size} bytes (limit ${limit})`)
    }
  }
}

await walk(join(root, 'public', '3d'))

const sourceFiles = []
async function collect(directory) {
  for (const name of await readdir(directory)) {
    const path = join(directory, name)
    const info = await stat(path)
    if (info.isDirectory()) await collect(path)
    else if (/\.(js|jsx|ts|tsx)$/.test(name) && !/\.test\.[jt]sx?$/.test(name)) sourceFiles.push(path)
  }
}
await collect(join(root, 'src'))
for (const path of sourceFiles) {
  if (/['"]\/3d\//.test(await readFile(path, 'utf8'))) violations.push(`${relative(root, path)}: origin-root 3D URL`)
}

if (violations.length) {
  console.error(violations.join('\n'))
  process.exitCode = 1
} else {
  console.log('3D asset budgets and URL contracts pass.')
}
