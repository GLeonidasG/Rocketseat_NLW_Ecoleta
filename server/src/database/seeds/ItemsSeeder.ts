import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("items").del()
        .then(() => {
            // Inserts seed entries
            return knex("items").insert([
                { image: "http://192.168.1.12:3333/uploads/baterias.svg", title:"Baterias" },
                { image: "http://192.168.1.12:3333/uploads/eletronicos.svg", title:"Eletrônicos" },
                { image: "http://192.168.1.12:3333/uploads/lampadas.svg", title:"Lâmpadas" },
                { image: "http://192.168.1.12:3333/uploads/oleo.svg", title:"Oléo de Cozinha" },
                { image: "http://192.168.1.12:3333/uploads/organicos.svg", title:"Orgânicos" },
                { image: "http://192.168.1.12:3333/uploads/papeis-papelao.svg", title:"Papeis e Papelões" },
            ]);
        });
};
