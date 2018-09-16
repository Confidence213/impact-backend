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
          message: "data not fund"
        });
      }

      res.send({
        data: batch
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
  },
  // ---------------------------------------------------------------------------
  // GET /batches/search
  search: (req, res) => {
    let filter = {};
    //check offset
    if (req.query.limit) {
      filter.limit = JSON.parse(req.query.limit);
    } else {
      filter.limit = 100;
    }

    //check page
    if (req.query.offset) {
      filter.offset = JSON.parse(req.query.offset);
    }

    //check sort
    if (req.query.sort) {
      //get sorting from query url
      //1. split all sort query
      let splitted_sort = req.query.sort.split("_");
      console.log("after split", splitted_sort);
      //2. get last char after _ (_asc or _desc)
      let sort_by = splitted_sort[splitted_sort.length - 1];
      console.log("sort_by", sort_by);
      //3. remove last item from array
      splitted_sort.pop();
      //4. join all char before (_asc or _desc)
      console.log(splitted_sort);
      let column = splitted_sort.join("_");

      if (sort_by === "asc" || sort_by === "desc") {
        //create order object and array inside
        filter.order = [];
        filter.order.push([column, sort_by]);
      } else {
        return res.send({
          message: "error",
          error: "wrong sorting format"
        });
      }
    }

    // get filter from query parameter
    filter.where = {};
    Object.keys(req.query).map(key => {
      if (
        key !== "limit" &&
        key !== "offset" &&
        key !== "sort" &&
        key !== "token"
      ) {
        filter.where[key] = req.query[key];
      }
    });

    models.batches
      .findAndCountAll(filter)
      .then(batch =>
        res.send({
          filter: filter,
          data: batch
        })
      )
      .catch(error =>
        res.send({
          message: "error",
          error: error
        })
      );
  },
  // ---------------------------------------------------------------------------
  // GET /batches/:id/students
  getStudentsByBatch: (req, res) => {

    const id = JSON.parse(req.params.id);

    models.batches.findAll({
      where: {
        id: id
      },
      include: [{ model: models.students, as: "students", attributes: { exclude: ["password"] } }]
    }).then(result => {
      if (result === null) {
        return res.send({
          message: "data not fund"
        })
      }

      res.send({
        data: result
      })
    })

    // models.batches.findOne({ where: { id: req.params.id } }).then(batch => {
    //   if (batch === null) {
    //     return res.send({
    //       message: "data not fund"
    //     });
    //   }

    //   res.send({
    //     data: batch
    //   });
    // });
  }
};
