const models = require("../models");

module.exports = {
  // ---------------------------------------------------------------------------
  // GET /partners
  get: (req, res) => {
    models.partners.findAll({ limit: 100 }).then(partner => {
      if (partner === null) {
        return res.send({
          message: "data not found"
        });
      }

      res.send({
        data: partner
      });
    });
  },
  // ---------------------------------------------------------------------------
  // GET /partners/:id
  getById: (req, res) => {
    req.params.id = JSON.parse(req.params.id);
    models.partners.findOne({ where: { id: req.params.id } }).then(partner => {
      if (partner === null) {
        return res.send({
          message: "data not found"
        });
      }

      res.send({
        data: partner
      });
    });
  },
  // ---------------------------------------------------------------------------
  // POST /partners
  post: (req, res) => {
    models.partners
      .create(req.body)
      .then(partner => {
        res.send({
          message: "insert data success",
          data: partner
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
  // PUT /partners/:id
  put: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.partners
      .findOne({ where: { id: req.params.id } })
      .then(partner => {
        if (partner) {
          return partner
            .update(req.body)
            .then(updated_partner =>
              res.send({
                message: "update data success",
                data: updated_partner
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
    //     let partner = await models.partners.findOne({ where: { id: req.params.id } }).then(partner => partner)

    //     if (partner) {
    //         await partner.update(req.body).then(updated_partner => res.send({
    //             message: "update data success",
    //             data: updated_partner
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
  // DELETE /partners/:id
  deleteById: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.partners
      .findOne({ where: { id: req.params.id } })
      .then(partner => {
        if (partner) {
          return partner
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
    //     let partner = await models.partners.findOne({ where: { id: req.params.id } }).then(partner => partner)

    //     if (partner) {
    //         await partner.destroy().then(deleted_employee => res.send({
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
  // GET /partners/search
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

    models.partners
      .findAndCountAll(filter)
      .then(partner =>
        res.send({
          filter: filter,
          data: partner
        })
      )
      .catch(error =>
        res.send({
          message: "error",
          error: error
        })
      );
  }
};
