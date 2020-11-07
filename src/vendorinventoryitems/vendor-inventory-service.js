const VendorInventoryService = {
  getAllVendorInventory(db) {
    return db.from('vendorinventoryitems').select('*');
  },
  getVendorInventoryById(db, vendors_id) {
    console.log('vendors_id', vendors_id);
    return db.from('vendorinventoryitems').select('*').where({
      id: vendors_id,
    });
    // .first()
  },
  insertVendors(db, newVendorItem) {
    return db
      .insert(newVendorItemInventory)
      .into('vendorinventoryitems')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  deleteVendorById(db, vendors_id) {
    return db('vendorinventoryitems')
      .where({
        id: vendors_id,
      })
      .delete();
  },

  updateVendorById(db, vendors_id, newVendorItem) {
    console.log(vendors_id, newVendorItem, 'hi');
    return db('vendorinventoryitems')
      .update(newVendorItem, (returning = true))
      .where({
        id: vendors_id,
      })
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
};
module.exports = VendorInventoryService;
