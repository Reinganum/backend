const winston = require('winston');
const {format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

const loggerWinston = winston.createLogger({
    format: combine(
        timestamp(),
        myFormat
      ),
      transports: [
        new winston.transports.Console({ level: 'error' }),
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error'
        })
      ]
    });
    
module.exports=loggerWinston