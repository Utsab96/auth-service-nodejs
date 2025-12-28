const { z } = require("zod");

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = registerSchema;

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register: validate(registerSchema),
  login: validate(loginSchema)
};
