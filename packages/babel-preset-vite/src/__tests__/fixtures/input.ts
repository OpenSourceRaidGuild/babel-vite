export const envVar = import.meta.env.VITE_VAR

export const modules = import.meta.glob('files/*.ts')

export const eagerModules = import.meta.globEager('files/*.ts')

export const hot = import.meta.hot
