const models = require("../models");

module.exports = {
  // ---------------------------------------------------------------------------
  // GET /batches
  get: (req, res) => {
    models.batches.findAll({ limit: 100 }).then(batch => {
      if (batch === null) {
        return res.send({
          message: "data not found"
        });
      }

      res.send({
        data: batch
      });
    });
  },
  // ---------------------------------------------------------------------------
  // GET /batches/:id
  getById: (req, res) => {
    req.params.id = JSON.parse(req.params.id);
    models.batches.findOne({ where: { id: req.params.id } }).then(batch => {
      if (batch === null) {
        return res.send({
          message: "data not found"
        });
      }

      res.send({
        data: batch
      });
    });
  },
  // ---------------------------------------------------------------------------
  // GET /batches/:id/batch
  getBatchesByBatch: (req, res) => {
    const id = JSON.parse(req.params.id);

    models.batches
      .findOne({
        where: {
          id: id
        },
        include: [
          {
            model: models.students,
            as: "students",
            attributes: { exclude: ["password"] }
          }
        ]
      })
      .then(result => {
        if (result === null) {
          return res.send({
            message: "data not found"
          });
        }

        res.send({
          data: result
        });
      });
  },
  // ---------------------------------------------------------------------------
  // POST /batches
  post: (req, res) => {
    models.batches
      .create(req.body)
      .then(batch => {
        res.send({
          message: "insert data success",
          data: batch
        });
      })
      .catch(err =>
        res.send({
          message: "error",
          error: err
        })
      );
  },
  // ---------------------------------------------------------------------------
  // PUT /batches/:id
  put: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.batches
      .findOne({ where: { id: req.params.id } })
      .then(batch => {
        if (batch) {
          return batch
            .update(req.body)
            .then(updated_batch =>
              res.send({
                message: "update data success",
                data: updated_batch
              })
            )
            .catch(err => Promise.reject(err));
        } else {
          res.send({
            message: "data not found"
          });
        }
      })
      .catch(err => {
        res.send({
          message: "error",
          error: err
        });
      });

    // using async await
    // try {
    //     let batch = await models.batches.findOne({ where: { id: req.params.id } }).then(batch => batch)

    //     if (batch) {
    //         await batch.update(req.body).then(updated_batch => res.send({
    //             message: "update data success",
    //             data: updated_batch
    //         }))
    //     } else {
    //         res.send({
    //             message: "data not found",
    //         })
    //     }
    // } catch (err) {
    //     res.send({
    //         message: "error",
    //         error: err
    //     })
    // }
  },
  // ---------------------------------------------------------------------------
  // DELETE /batches/:id
  deleteById: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.batches
      .findOne({ where: { id: req.params.id } })
      .then(batch => {
        if (batch) {
          return batch
            .destroy()
            .then(deleted_employee =>
              res.send({
                message: "delete data success",
                data: deleted_employee
              })
            )
            .catch(err => Promise.reject(err));
        } else {
          res.send({
            message: "data not found"
          });
        }
      })
      .catch(err => {
        res.send({
          message: "error",
          error: err
        });
      });

    // using async await
    // try {
    //     let batch = await models.batches.findOne({ where: { id: req.params.id } }).then(batch => batch)

    //     if (batch) {
    //         await batch.destroy().then(deleted_employee => res.send({
    //             message: "delete data success",
    //             data: deleted_employee
    //         }))
    //     } else {
    //         res.send({
    //             message: "data not found",
    //         })
    //     }
    // } catch (err) {
    //     res.send({
    //         message: "error",
    //         error: err
    //     })
    // }
  }
};
