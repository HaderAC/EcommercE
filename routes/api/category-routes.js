const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include:{ model: Product},
    });

    const categories = categoryData.map(category => category.get({plain: true}));
    res.status(200).json(categories);
  
  } catch(e) {
    res.status(500).json(e);
    console.log(e);
  }

  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
    include:{ model: Product},
    });

    if (!categoryData) {
      res.status(404).json({message: "Cannot find that category"});
      return;
    }

    const category = categoryData.get({plain: true});
    res.status(200).json(category);

    
  }catch(e) {
    res.status(500).json(e);
    console.log(e);
  }
  
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try{
    const categoryData3 = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(201).json(categoryData3); 
  }catch(e) {
    res.status(500).json(e);
    console.log(e);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try{
    const categoryData4 = await Category.update({
      category_name: req.body.category_name,

    },
    {
      where: {
        id: req.params.id,
      },
    },
    )
    res.status(200).json(categoryData3); 
  }catch(e) {
    res.status(500).json(e);
    console.log(e);
  }
  // update a category by its `id` value
});


router.delete('/:id', async (req, res) => {
  try {
    const categoryData5 = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json(categoryData5); 
  }catch(e) {
    res.status(500).json(e);
    console.log(e);
  }
  // delete a category by its `id` value
});

module.exports = router;
