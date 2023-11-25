import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 100 requests per windowMs 
    keyGenerator: (req) => {
      // Your custom key generation logic
      return req.headers['x-api-key'] || req.ip;
    }
  });

export const limiterLogout = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    keyGenerator: (req) => {
        // Your custom key generation logic
        return req.headers['x-api-key'] || req.ip;
    },
    message: { message: "Too Many Logout Request" }
});
export const limiterOTP = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 4, // limit each IP to 4 requests per windowMs
    message: { message: "Too Many OTP Request Try after 10 minutes" },
    keyGenerator: (req) => {
        // Your custom key generation logic
        return req.headers['x-api-key'] || req.ip;
    }
});