exports.adminDashboard = (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        data: "You got access to the admin area",
      });
  };