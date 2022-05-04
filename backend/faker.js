import { CONFIG } from "./config.js"
import { db } from "./models/database.js"
import Artist from "./models/artistModel.js"
import Artwork from "./models/artworkModel.js"
import { faker } from '@faker-js/faker'

const fakeDB = async () => {
    await db.sync({ force: true })

    for (let index = 0; index < 150; index++) {
        await Artist.create({
            first_name: faker.name.firstName(),
            second_name: faker.name.middleName(),
            last_name: faker.name.lastName(),
            birth_date: faker.date.between('1960-01-01', '1970-01-01'),
            death_date: Math.random() > 0.75 ? faker.date.between('2008-01-01', '2022-01-01') : null,
            image: faker.image.avatar(),
            country: faker.address.country(),
            description: faker.lorem.paragraph()
        })
        
    }

    for (let index = 0; index < 150; index++) {
        await Artwork.create({
            name: faker.lorem.sentence(),
            authorId: Math.round(Math.random() * 149)+1,
            created_date: faker.date.between('1980-01-01', '2022-01-01'),
            image: Math.random() > 0.5 ? faker.image.animals(undefined, undefined, true) : Math.random(undefined, undefined, true) > 0.5 ? faker.image.city(undefined, undefined, true) : faker.image.abstract(undefined, undefined, true),
            sizeX: Math.round(Math.random() * 1000) + 100,
            sizeY: Math.round(Math.random() * 300) + 100,
            location: faker.address.city(),
            description: faker.lorem.paragraph()
        })
        
    }
}

fakeDB().then(x => console.log('ok')).catch(x => console.log(x))