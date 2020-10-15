import { Request, Response } from 'express'
import { getRepository } from 'typeorm';

import orphnageView from '../views/orphnages_view'
import * as Yup from 'yup'

import Orphnage from '../models/Orphnage';

export default {
    async index(request: Request, response: Response) {
        const orphnagesRepository = getRepository(Orphnage);

        const orphnages = await orphnagesRepository.find({
            relations: ['images']
        });

        return response.json(orphnageView.renderMany(orphnages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphnagesRepository = getRepository(Orphnage);

        const orphnage = await orphnagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphnageView.render(orphnage));
    },


    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = request.body;
    
        const orphnagesRepository = getRepository(Orphnage);
    
        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        })
    
        const orphnage = orphnagesRepository.create(data);
    
        await orphnagesRepository.save(orphnage);
        
        return response.status(201).json(orphnage);

    }    
}