const csv = require('csvtojson/v2');
const slugify = require('slugify');
const fs = require('fs');
const csvFilePath = './IBGE/UF_MUN_2021.csv';

csv({
    delimiter: ';',
    quote: '"'
})
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        jsonObj.map((data => {

            try {
                const cfgSlug = {
                    replacement: '-',  // replace spaces with replacement character, defaults to `-`
                    lower: true,      // convert to lower case, defaults to `false`
                    strict: false,     // strip special characters except replacement, defaults to `false`
                    trim: true
                };

                let slug_estado = slugify(data.estado, cfgSlug);

                let slug_cidade = slugify(data.municipio, cfgSlug);

                data.slug_cidade = slug_cidade;
                data.slug_estado = slug_estado;
                return data;
            } catch (error) {
                console.error(data);
                process.exit(1);
            }

        }))

        jsonObj.sort((a, b) =>{
            if (a.estado < b.estado) {
                return -1;
            }
            if (a.estado > b.estado) {
                return 1;
            }
            return 0;
        });


        let estadoCidades = {};

        jsonObj.map(data => {

            if( !estadoCidades[data.uf] ){
                estadoCidades[data.uf] = {
                    ibge_uf_id: data.ibge_uf_id,
                    nome: data.estado,
                    slug: data.slug_estado,
                    uf : data.uf,
                    cidades : []
                }
            }

            estadoCidades[data.uf].cidades.push({
                ibge_municipio_id: data.ibge_municipio_id,
                nome : data.municipio,
                slug : data.slug_cidade
            })

        });

        //console.log(estadoCidades);

        fs.writeFile('uf_cidades.json', JSON.stringify(estadoCidades, null, 4), 'utf8', (err) => {
            console.error(err);
            process.exit(1)
        });
    })