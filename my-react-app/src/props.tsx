export type SelectedModelsProps = {
    [model: string]: ModelProps
}

export type ModelProps = {
    selected: boolean,
    logo: string
}