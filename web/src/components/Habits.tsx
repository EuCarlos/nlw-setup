interface IHabit {
    completed: number
}

export function Habit ({ completed }: IHabit) {
    return (
        <p>{completed}</p>
    )
}