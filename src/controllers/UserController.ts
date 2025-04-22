import { Request, Response } from 'express';
import postgres_db from '../db/postgressConexion';
import { UsuarioService } from '../services/UserServce';
import exp from 'constants';
import { descripToken } from '../helpers/utils';

const userService = new UsuarioService(postgres_db);

export const getUserController = async (req: Request, res: Response) => {
    try {
        const udsers = await userService.getUsers();
        if (typeof udsers === 'string') {
            res.status(404).json({ message: udsers });
        }
        res.status(200).json(udsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
        console.error("Error en getUserController", error);
    }
}

export const createUserController = async (req: Request, res: Response) => {
    try {
        const data = req.body.payload;
        const userInfo = descripToken(req);
        const user = await userService.createUser(data,userInfo.sub);
        if (typeof user === 'string') {
            res.status(404).json({ message: user });
        }
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
        console.error("Error en createUserController", error);
    }
}