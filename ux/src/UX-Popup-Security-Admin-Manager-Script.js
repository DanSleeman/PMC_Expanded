const popupAdminWindow = '.modal-dialog';
const securityAdminButton = '#securityAdminPopup';

let appKeyNotFound = false;
let appObserver = null;

function updateElementCache() {
  return {
    securityAdminManagerAccess: document.querySelector("a[href^='/Security/SecurityAdminManager']"),
    modalDialog: document.querySelector(popupAdminWindow),
    button: document.querySelector(securityAdminButton)
  };
}

function canProceed() {
  if (appKeyNotFound) return false;
  const cache = updateElementCache();
  return cache.securityAdminManagerAccess && cache.modalDialog && !cache.button;
}

async function waitForCloudAppKey(popupContainer, timeout = 2000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const ele = document.querySelector(popupAdminWindow);
    if (!ele) return null;
    
    const koElement = ko.contextFor(ele);
    const cloudAppKey = koElement?.$root?.contentController?.elements[popupContainer]?.config?.cloudApplicationActionKey;
    
    if (cloudAppKey) return cloudAppKey;
    await new Promise(r => setTimeout(r, 100));
  }
  
  throw new Error('cloudAppKey not found');
}

function setupSecurityAdminButton(parentId, id, name, cloudAppKey) {
  const url = new URL(window.location.origin + '/Security/SecurityAdminManager');
  const token = new URLSearchParams(window.location.search).get('__asid');
  
  url.searchParams.append('__asid', token);
  url.searchParams.append('CloudApplicationActionKey', cloudAppKey);

  const link = document.createElement('a');
  Object.assign(link, {
    id,
    href: url.toString(),
    target: '_blank',
    className: 'plex-text-link',
    textContent: name
  });

  document.querySelector(parentId)?.querySelector('.plex-form-buttons')?.insertBefore(link, document.querySelector(parentId)?.querySelector('.plex-form-buttons')?.firstChild);
}

async function popupAdminButtonCreate() {
  if (!canProceed()) return;
  
  try {
    const popupContainer = document.querySelector('div.plex-form-content')?.id;
    if (!popupContainer) return;
    
    const cloudAppKey = await waitForCloudAppKey(popupContainer);
    if (!canProceed()) return;
    
    setupSecurityAdminButton(popupAdminWindow, 'securityAdminPopup', 'Security Admin Manager', cloudAppKey);
  } catch {
    appKeyNotFound = true;
  }
}

function popupAdminWrapper() {
  if (!document.body) return;
  
  appObserver = new MutationObserver(popupAdminButtonCreate);
  appObserver.observe(document.body, { childList: true, subtree: true });
  
  popupAdminButtonCreate(); // Initial check
}

popupAdminWrapper();
