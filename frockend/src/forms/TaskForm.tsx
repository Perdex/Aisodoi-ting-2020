import axios from 'axios';
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {Button, Grid, Input, InputLabel, NativeSelect} from "@material-ui/core";
import {useMutation} from "react-query";


enum DifficultyEnum {
    easy = "easy",
    normal = "normal",
    hard = "hard",
}

enum RarityEnum {
    common = "common",
    uncommon = "uncommon",
    rare = "rare",
    epic = "epic",
    legendary = "legendary",
}

interface IFormInput {
    start: String;
}

interface TaskData {
    name: String;
    difficulty: DifficultyEnum;
    rarity: RarityEnum;
    start: String;
    destination: String;
}


export function TaskForm() {
    const [ mutate ] = useMutation((data: TaskData) => {
        return axios.put("http://localhost:8000/tasks", data);
    });
    const { handleSubmit, control } = useForm<IFormInput>();
    const onSubmit = (data: IFormInput) => {

        const startLat = 60.6382379 + Math.random() * 0.01 - 0.005;
        const endLat = 60.6382379 + Math.random() * 0.01 - 0.005;
        const startLon = 25.3179172 + Math.random() * 0.01 - 0.005;
        const endLon = 25.3179172 + Math.random() * 0.01 - 0.005;

        const difficulties: DifficultyEnum[] = [
            ...Array(5).fill(DifficultyEnum.easy),
            ...Array(3).fill(DifficultyEnum.normal),
            ...Array(1).fill(DifficultyEnum.hard),
        ];
        const rarities: RarityEnum[] = [
            ...Array(5).fill(RarityEnum.common),
            ...Array(4).fill(RarityEnum.uncommon),
            ...Array(3).fill(RarityEnum.rare),
            ...Array(2).fill(RarityEnum.epic),
            ...Array(1).fill(RarityEnum.legendary),
        ];
        const taskData = {
            name: "Insomniac",
            difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
            rarity: rarities[Math.floor(Math.random() * rarities.length)],
            start: `${startLat},${startLon}`,
            destination: `${endLat},${endLon}`,
        }
        console.log(taskData);
        mutate(taskData).then(res => console.log(res));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>

                <Grid container xs={12}>
                    <InputLabel htmlFor="start">Start location</InputLabel>
                    <Controller
                        as={Input}
                        name={"start"}
                        control={control}
                        defaultValue={""}
                    />
                </Grid>

                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
        </form>
    );
}

