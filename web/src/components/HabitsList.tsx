import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface IHabitsList {
    date: Date,
    onCompletedChange: (completed: number) => void
}

interface IHabitsInfo {
    possibleHabits: Array<{
        id: string,
        title: string,
        created_at: string
    }>,
    completedHabits: string[]
}

export function HabitsList({ date, onCompletedChange }: IHabitsList) {
    const [habitsInfo, setHabitsInfo] = useState<IHabitsInfo>()

    useEffect(() => {
        api
            .get('/day',{
                params: { date: date.toISOString() }
            })
            .then(response => setHabitsInfo(response.data))
    },[])

    async function handleToggleHabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[] = []
        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        if(isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

            setHabitsInfo({
                possibleHabits: habitsInfo!.possibleHabits,
                completedHabits
            })
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]

            setHabitsInfo({
                possibleHabits: habitsInfo!.possibleHabits,
                completedHabits
            })

            onCompletedChange(completedHabits.length)
        }
        
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())
    
    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map(habit => {
                return (
                    <Checkbox.Root 
                        key={habit.id} 
                        onCheckedChange={() => handleToggleHabit(habit.id)}
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        className="flex items-center gap-3 group"
                    >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>
                        </div>

                        <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-500">{habit.title}</span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}