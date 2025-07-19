// import multer from "multer";

// const storage=multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// export const upload=multer({storage})

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "/tmp"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// export const upload = multer({ storage });

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp"); // ✅ Vercel me sirf /tmp hi allowed hai
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
