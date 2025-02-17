// This file is generated. Do not update manually!

import { type FromSchema } from 'json-schema-to-ts';

import { type IterablePromise } from '../method';
import { Resource } from '../resource';
import * as schemas from '../schemas/broadcasts';
import { type RequestOptions } from '../types';
import { BroadcastsNotifications } from './broadcasts/notifications';

type ListBroadcastsResponse = FromSchema<typeof schemas.ListBroadcastsResponseSchema>;
type ListBroadcastsPayload = FromSchema<typeof schemas.ListBroadcastsPayloadSchema>;
type GetBroadcastsResponse = FromSchema<typeof schemas.GetBroadcastsResponseSchema>;

export class Broadcasts extends Resource {
  path = 'broadcasts';
  entity = 'broadcast';
  notifications = new BroadcastsNotifications(this.client);

  /**
   * List all notification broadcasts. Broadcasts are sorted in descending order by
   * the sent_at timestamp.
   *
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  list(options?: RequestOptions): IterablePromise<ListBroadcastsResponse>;

  /**
   * List all notification broadcasts. Broadcasts are sorted in descending order by
   * the sent_at timestamp.
   *
   * @param data
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  list(data: ListBroadcastsPayload, options?: RequestOptions): IterablePromise<ListBroadcastsResponse>;

  list(
    dataOrOptions: ListBroadcastsPayload | RequestOptions,
    options?: RequestOptions,
  ): IterablePromise<ListBroadcastsResponse> {
    this.assertFeatureFlag('broadcasts-list');

    return this.request(
      {
        method: 'GET',
        paged: true,
      },
      dataOrOptions,
      options,
    );
  }

  /**
   * Fetch a notification broadcast by its ID.
   *
   * @param broadcastId - ID of the notification broadcast.
   * @param options - override client request options.
   * @returns
   *
   * @beta
   **/
  get(broadcastId: string, options?: RequestOptions): Promise<GetBroadcastsResponse> {
    this.assertFeatureFlag('broadcasts-get');

    return this.request(
      {
        method: 'GET',
        path: '{broadcast_id}',
      },
      broadcastId,
      options,
    );
  }
}
