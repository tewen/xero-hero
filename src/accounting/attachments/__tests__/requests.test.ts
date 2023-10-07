import { Duplex } from 'node:stream';

import { v4 as uuid } from 'uuid';
import type { XeroClient } from 'xero-node';

import { createInvoiceAttachment } from '../../../';

const getMockXeroClient = (): any => {
  return {
    accountingApi: {
      createInvoiceAttachmentByFileName: jest.fn(),
    },
  };
};

describe('attachments/requests', () => {
  describe('createInvoiceAttachment()', () => {
    it('should call the createInvoiceAttachmentByFileName() method with the relevant arguments ', () => {
      const client = getMockXeroClient() as unknown as XeroClient;
      const tenantId = uuid();
      const invoiceId = uuid();
      const filename = 'test.pdf';
      const contents = Buffer.from('Test Content Here');

      createInvoiceAttachment(client, tenantId, {
        contents,
        filename,
        invoiceId,
      });

      expect(
        client.accountingApi.createInvoiceAttachmentByFileName,
      ).toHaveBeenCalledWith(tenantId, invoiceId, filename, expect.any(Duplex));
    });
  });
});
