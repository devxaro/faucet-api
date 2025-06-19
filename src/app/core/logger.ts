import {createLogger, format, transports} from 'winston';

export const logger = createLogger({
  level: 'verbose',
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    format.errors({stack: true}),
    format.splat(),
    format.json()
  ),
  defaultMeta: {service: 'AI-Wrapper'},
  transports: [
    new transports.Console({
      level: 'verbose',
      handleExceptions: false
    })
    // new ElasticsearchTransport({
    //   level: 'info',
    //   clientOpts: {
    //     node: 'http://localhost:9200', // remplacez par l'URL de votre cluster Elasticsearch
    //     auth: {
    //       username: 'elastic', // remplacez par votre username Elasticsearch
    //       password: 'changeme' // remplacez par votre mot de passe Elasticsearch
    //     }
    //   },
    //   indexPrefix: 'log-', // l'index sera créé avec ce préfixe suivi de la date du jour
    //   templateName: 'my-index-template', // nom du template d'index
    //   templateFile: 'path/to/my/template.json', // chemin vers le fichier du template d'index
    //   templateOverwrite: false
    // })
  ]
});
