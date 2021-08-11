import { getCustomRepository } from "typeorm"
import { TagsRepositories} from '../repositories/TagsRepositories'


class CreateTagService {

  async execute(name: string){
    const tagsRepositories = getCustomRepository(TagsRepositories)

    if (!name){
      throw new Error("Nome não preenchido")
    }
    const TagAlreadyExists = await tagsRepositories.findOne({name})

    if(TagAlreadyExists){
      throw new Error("nome de tag já existe")
    }

    const tag = tagsRepositories.create({name})
    await tagsRepositories.save(tag)

    return tag;

  }
                 
}

export { CreateTagService }