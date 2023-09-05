const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.get("/", async (req, res) => {
  try {
    const { purchased, priority } = req.query;
    let filter = {};

    if (purchased || priority) {
      if (purchased) {
        filter.purchased = purchased;
      }
      if (priority) {
        filter.priority = priority;
      }
    }

    res.status(200).send(await Item.find(filter));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Item.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      priority: req.body.priority,
      purchased: req.body.purchased,
    });
    await newItem.save();
    res.status(200).send(newItem);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(item_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id/purchased", async (req, res) => {
  try {
    const item_id = req.params.id;
    const purchasedItem = await Item.findByIdAndUpdate(
      item_id,
      {
        purchased: true,
      },
      {
        new: true,
      }
    );
    res.status(200).send(purchasedItem);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item_id = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(item_id);
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
