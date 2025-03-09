import { NextResponse } from 'next/server';
import { AtpAgent, BlobRef } from '@atproto/api';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');
    const text = formData.get('text');
    const description = formData.get('description');

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const agent = new AtpAgent({ service: 'https://bsky.social' });
    await agent.login({ identifier: process.env.BLUESKY_USERNAME, password: process.env.BLUESKY_PASSWORD });

    let blobRef= null;

    if (imageFile) {
      const imageBuffer = await imageFile.arrayBuffer();
      const uint8Array = new Uint8Array(imageBuffer);

      const uploadResponse = await agent.uploadBlob(uint8Array, {
        encoding: imageFile.type
      });

      if (uploadResponse.success) {
        blobRef = new BlobRef(
          uploadResponse.data.blob.ref,
          imageFile.type,
          uint8Array.length
        );
      } else {
        console.error('Failed to upload image to Bluesky');
        return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
      }
    }

    const postContent= {
      $type: "app.bsky.feed.post",
      text: `${text}\n${description}`,
    };

    if (blobRef) {
      postContent.embed = {
        $type: 'app.bsky.embed.images',
        images: [{ image: blobRef, alt: description }],
      };
    }

    const response = await agent.post(postContent);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Bluesky post error:', error);
    return NextResponse.json({ error: 'Failed to post to Bluesky' }, { status: 500 });
  }
}
