export const OIDC = 'OIDC';
export const NONE = 'NONE';
export const AUTHENTICATION_TYPE_ENUM = [NONE, OIDC];

export const HOUSEHOLD = 'household';
export const BUSINESS = 'business';

export const COOKIE_CONSENT = 'cookie-consent';

export const READ_ONLY = 'readonly';
export const GUEST_USER = {
  lastName: 'Guest',
  firstName: 'Guest',
  id: 'Guest',
  roles: ['Guest'],
};
export const SIMPSONS = 'simpsons';
export const TIC = 'tic';
export const DEFAULT = 'default';
export const QUESTIONNAIRE_EXAMPLES = [SIMPSONS, TIC];

export const AUTHORIZED_ROLES = ['Guest', 'offline_access'];

export const QUESTIONNAIRE_EXAMPLE_URL = q =>
  `${window.location.origin}/static/questionnaire/${q}/form.json`;
export const METADATA_EXAMPLE_URL = q =>
  `${window.location.origin}/static/questionnaire/${q}/metadata.json`;
export const DATA_EXAMPLE_URL = q =>
  `${window.location.origin}/static/questionnaire/${q}/data.json`;

export const DEFAULT_DATA_URL = DATA_EXAMPLE_URL(DEFAULT);
export const DEFAULT_METADATA_URL = METADATA_EXAMPLE_URL(DEFAULT);

// Paradata
export const ORCHESTRATOR_CATEGORY = 'orchestrator';
export const EVENT_TYPE_CREATE = 'orchestrator-create';
export const EVENT_TYPE_CLICK = 'click';

// type orchestrator
export const ORCHESTRATOR_COLLECT = 'orchestrator-collect';
export const ORCHESTRATOR_READONLY = 'orchestrator-readonly';
export const ORCHESTRATOR_VIZUALISATION = 'orchestrator-vizualisation';
