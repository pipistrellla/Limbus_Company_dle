export const LCRandomTask = (arrayWithTasks) => {
    return Math.floor((Math.random() * (arrayWithTasks.length - 1 + 1)))
}