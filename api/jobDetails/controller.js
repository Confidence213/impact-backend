const models = require("../models");

module.exports = {
  // ---------------------------------------------------------------------------
  // GET /jobDetails
  get: (req, res) => {
    models.jobDetails.findAll({ limit: 100 }).then(jobDetail => {
      if (jobDetail === null) {
        return res.send({
          message: "data not found"
        });
      }

      res.send({
        data: jobDetail
      });
    });
  },
  // ---------------------------------------------------------------------------
  // GET /jobDetails/:id
  getById: (req, res) => {
    req.params.id = JSON.parse(req.params.id);
    models.jobDetails
      .findOne({ where: { id: req.params.id } })
      .then(jobDetail => {
        if (jobDetail === null) {
          return res.send({
            message: "data not fund"
          });
        }

        res.send({
          data: jobDetail
        });
      });
  },
  // ---------------------------------------------------------------------------
  // POST /jobDetails
  post: (req, res) => {
    models.jobDetails
      .create(req.body)
      .then(jobDetail => {
        res.send({
          message: "insert data success",
          data: jobDetail
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
  // PUT /jobDetails/:id
  put: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.jobDetails
      .findOne({ where: { id: req.params.id } })
      .then(jobDetail => {
        if (jobDetail) {
          return jobDetail
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
    //     let jobDetail = await models.jobDetails.findOne({ where: { id: req.params.id } }).then(jobDetail => jobDetail)

    //     if (jobDetail) {
    //         await jobDetail.update(req.body).then(updated_batch => res.send({
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
  // DELETE /jobDetails/:id
  deleteById: async (req, res) => {
    req.params.id = JSON.parse(req.params.id);

    models.jobDetails
      .findOne({ where: { id: req.params.id } })
      .then(jobDetail => {
        if (jobDetail) {
          return jobDetail
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
    //     let jobDetail = await models.jobDetails.findOne({ where: { id: req.params.id } }).then(jobDetail => jobDetail)

    //     if (jobDetail) {
    //         await jobDetail.destroy().then(deleted_employee => res.send({
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
  // GET /jobDetails/search
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

    models.jobDetails
      .findAndCountAll(filter)
      .then(jobDetail =>
        res.send({
          filter: filter,
          data: jobDetail
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
