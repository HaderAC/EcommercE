const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  try{
    const tagsData = await Tag.findAll({
      include: {model: Product},
    });
    const tags = tagsData.map(tag => tag.get({plain: true}));
    res.status(200).json(tags);

  }catch(e){
    res.status(500).json(e);
    console.log(e);
  }
  // find all tags
  // be sure to include its associated Product data
});

// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async(req, res) => {
  try{ 
    const tagsData2 = await Tag.findByPk(req.params.id,{
      include:{model: Product},
    });

     if (!tagsData2) {
      res.status(404).json({message: "Cannot find that Tag Data"});
      return;
    }
    const tag = tagsData2.get({plain: true});
    res.status(200).json(tag);

  }catch(e){
    res.status(500).json(e);
    console.log(e);
  }
  
});

router.post('/', async(req, res) => {
  try{
    const tagsData3 = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(201).json(tagsData3); 
  }catch(e){
res.status(500).json(e);
console.log(e);
  }
  // create a new tag
});

router.put('/:id', async(req, res) => {
  try{
    const tagsData4 = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
    )
    res.status(200).json(tagsData4);
  }catch(e){
    res.status(500).json(e);
    console.log(e);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async(req, res) => {
  try{
    const tagsData5 = await Tag.destroy({
      where:{
        id: req.params.id,
      }
    })
    res.status(200).json(tagsData5);
  }catch(e){
    res.status(500).json(e);
    console.log(e);
  }
  // delete on tag by its `id` value
});

module.exports = router;
