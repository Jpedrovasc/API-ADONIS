 //import { Request } from '@adonisjs/core/build/standalone'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Moment'

export default class CommentsController {

    public async store({request,params,response}:HttpContextContract) {
        const body = request.body()
        const momentId = params.momentId 

      await Moment.findOrFail(momentId)

      body.momentId = momentId
     
      const comment = await Comment.create(body)

      response.status(201)

      return {
        message: 'Comentário criado com sucesso!',
        data: comment,
      }

    }

      public async index() {
        const comment = await Comment.all()
    
        return {
          data: comment,
        }
      }

      public async destroy({params}: HttpContextContract){

        const comment = await Comment.findOrFail(params.id)

        await comment.delete()

        return{
           message: "Momento excluido com sucesso!",
           data:comment,   
         }
      }

}
