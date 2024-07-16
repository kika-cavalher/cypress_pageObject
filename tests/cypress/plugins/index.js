/// <reference types="cypress" />



//Conex'ao banco de dados e exclus'ao dos dados inseridos
const { Pool } = require('pg')

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {

  const configJson = require(config.configFile)
  const pool = new Pool(configJson.dbConfig)

  on('task', {
    removeUser(email) {
      return new Promise(function(resolve){
        pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
          if(error) {
            throw error
          }
          resolve({success: result})
        })
      })
    },
    findToken(email) {
      return new Promise(function(resolve){
        pool.query(
          'select B.token from ' + 
          'public.users A ' +
          'INNER JOIN public.user_tokens B ' + 
          'ON A.id = B.user_id ' + 
          'WHERE A.email = $1 ' + 
          'ORDER BY B.created_at ', [email], function(error, result){
            if(error) {
              throw error
            }
            resolve({token: result.rows[0].token})
        })
      })
    }
  



  })
}
