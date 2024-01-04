import { Readable } from 'stream';

export class StreamUtil {
    static async toString(stream: Readable, encoding: BufferEncoding = 'base64'): Promise<string> {
        const buffer = await StreamUtil.toBuffer(stream);
        return buffer.toString(encoding);
    }

    static async toBuffer(stream: Readable): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];
            stream
                .on('data', (data) => chunks.push(data))
                .on('end', () => resolve(Buffer.concat(chunks)))
                .on('error', reject);
        });
    }
}