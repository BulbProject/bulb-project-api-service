import type { OrganizationReference } from 'ts4ocds';
import type { RequirementResponse as OCDSRequirementResponse } from 'ts4ocds/extensions/requirements';

export type RequirementResponse = ItemRequirementResponse | TendererRequirementResponse;

interface ItemRequirementResponse extends OCDSRequirementResponse {
  relatedItem?: string;
  relatedTenderer?: never;
}

interface TendererRequirementResponse extends OCDSRequirementResponse {
  relatedTenderer?: OrganizationReference;
}
