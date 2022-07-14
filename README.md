# Extrai dados de CSV IBGE e comverte em JSON

## Exemplo de resultado:

```json
    "DF": {
        "ibge_uf_id": "53",
        "nome": "Distrito Federal",
        "slug": "distrito-federal",
        "uf": "DF",
        "cidades": [
            {
                "ibge_municipio_id": "5300108",
                "nome": "BRASÍLIA",
                "slug": "brasilia"
            }
        ]
    },
```

## Instalação:

**CLONE** 

```bash
$ git clone  https://github.com/fernandohcorrea/estados_cidades_ibge_json.git
```

**NPM**

```bash
$ npm install
```

## Execução:

```bash
$ npm start
```

### Saida

A saida do JSON é o arquivo gerado uf_cidade.json