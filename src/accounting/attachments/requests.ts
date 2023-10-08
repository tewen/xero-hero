import type { ReadStream } from 'node:fs';
import type http from 'node:http';

import { bufferToStream } from 'tranquil-stream';
import type { Attachments, XeroClient } from 'xero-node';

type ICreateInvoiceAttachmentParameters = {
  contents: Buffer;
  filename: string;
  invoiceId: string;
};

export const createInvoiceAttachment = async (
  client: XeroClient,
  tenantId: string,
  { invoiceId, filename, contents }: ICreateInvoiceAttachmentParameters,
): Promise<{
  body: Attachments;
  response: http.IncomingMessage;
}> => {
  return client.accountingApi.createInvoiceAttachmentByFileName(
    tenantId,
    invoiceId,
    filename,
    bufferToStream(contents) as unknown as ReadStream,
  );
};
