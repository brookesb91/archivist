import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema(
  {
    thread: String,
    board: String,
    posts: [
      {
        // Numeric post ID
        no: Number,
        // ID of the thread being replied to
        resto: Number,
        // Is sticky?
        sticky: Number,
        // Is closed to replies?
        closed: Number,
        // EST/EDT timezone
        now: String,
        // UNIX timestamp
        time: Number,
        // User name, defaults to anonymous
        name: String,
        // Tripcode - !trip or !!securetrip
        trip: String,
        // Post ID
        id: String,
        // null, `mod`, `admin`, `admin_highlight`, `manager`, `developer`, `founder`
        capcode: {
          type: String,
          enum: [
            null,
            'mod',
            'admin',
            'admin_highlight',
            'manager',
            'developer',
            'founder',
          ],
        },
        // ISO 3166-1 alpha2 country code
        country: String,
        // Poster's country name
        country_name: String,
        // Subject text
        sub: String,
        // Post comment (HTML escaped)
        com: String,
        // Image upload UNIX timestamp
        tim: Number,
        //Attachment filename
        filename: String,
        // Attachment extension
        ext: String,
        // Attachment file size
        fsize: Number,
        // base64 MD5 of attachment
        md5: String,
        // Image width
        w: Number,
        // Image height
        h: Number,
        // Thumbnail width
        tn_w: Number,
        // Thumbnail height
        tn_h: Number,
        // File deleted from the post?
        filedeleted: Number,
        // Image was spoilered?
        spoiler: Number,
        // Custom spoiler ID for spoilered image
        custom_spoiler: Number,
        // Total replies to thread
        replies: Number,
        // Total images in the thread
        images: Number,
        // Thread reached bump limit?
        bumplimit: Number,
        // Thread reached image limit?
        imagelimit: Number,
        // /f/ only - category of .swf attachment
        tag: String,
        // SEO URL slug
        semantic_url: String,
        // Year 4chan pass bought
        since4pass: Number,
        // Number of unique posters in thread
        unique_ips: Number,
        // Has mobile optimized image?
        m_img: Number,
        // Archived?
        archived: Number,
        // Archived UNIX timestamp
        archived_on: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Thread = mongoose.model('Thread', threadSchema);

export { Thread };
