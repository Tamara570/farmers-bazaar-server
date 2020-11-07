const path = require('path');
const express = require('express');
const xss = require('xss');
const VendorInventoryService = require('./vendors-inventory-service');

const vendorsInventoryRouter = express.Router();
const jsonParser = express.json();

const serializevendorinventory = vendors => ({
  id: vendorinventoryitem.id,
  item_name: vendorinventoryitem.item_name,
  item_description: vendorinventoryitem.item_description,
  item_count: vendorinventoryitem.item_count,
  item_price: vendorinventoryitem.item_price,
  item_img: vendorinventoryitem.item_img,
  vendor_id: vendorinventoryitem.vendor_id,
  date_created: vendorinventoryitem.date_created,
});

vendorInventoryRouter
  .route('/')
  .get((req, res, next) => {
    vendorsInventoryService
      .getAllVendors(req.app.get('db'))
      .then(vendors => {
        res.json(vendors);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      id,
      item_name,
      item_description,
      item_count,
      item_price,
      item_img,
      vendor_id,
      date_created,
    } = req.body;

    const newVendorItemItem = {
      id,
      item_name,
      item_description,
      item_count,
      item_price,
      item_img,
      vendor_id,
      date_created,
    };

    for (const [key, value] of Object.entries(newVendorItem))
      if (value == null)
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body`,
          },
        });

    console.log(newVendorItemItem);

    VendorInventoryService.insertVendors(req.app.get('db'), newVendorItemItem)
      .then(vendor => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${vendor.id}`))
          .json(vendor);
      })
      .catch(next);
  });

vendorsInventoryRouter
  .route('/:vendor_id')
  .all((req, res, next) => {
    VendorInventoryService.getVendorsById(
      req.app.get('db'),
      req.params.vendor_id
    )
      .then(vendors => {
        if (!vendors) {
          return res.status(404).json({
            error: { message: `Vendor doesn't exist` },
          });
        }
        res.vendors = vendors; // save the vendor for the next middleware
        next(); // don't forget to call next so the next middleware happens!
      })
      .catch(next);
  })

  .get((req, res, next) => {
    res.json(serializevendorinventory(res.vendors));
  })

  .delete((req, res, next) => {
    VendorInventoryService.deleteVendorById(
      req.app.get('db'),
      req.params.vendor_id
    )
      .then(vendorRows => {
        res.status(204).json(vendorRows).end();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const {
      id,
      item_name,
      item_description,
      item_count,
      item_price,
      item_img,
      vendor_id,
      date_created,
    } = req.body;

    const vendorInventoryToUpdate = {
      id,
      item_name,
      item_description,
      item_count,
      item_price,
      item_img,
      vendor_id,
      date_created,
    };
    console.log(vendorInventoryToUpdate, 'hello');

    const numberOfValues = Object.values(vendorInventoryToUpdate).filter(
      Boolean
    ).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Missing "id", "item_name", "item_description", "item_count", "item_price", "item_img", "vendor_id", "date_created"'`,
        },
      });
    }
    VendorInventoryService.updateVendorById(
      req.app.get('db'),
      req.params.vendor_id,
      vendorInventoryToUpdate
    )
      .then(vendorInventoryToUpdate => {
        res.status(200).json(serializevendorinventory(vendorInventoryToUpdate));
      })
      .catch(next);
  });

module.exports = vendorsInventoryRouter;
