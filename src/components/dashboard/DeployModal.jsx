/* eslint-disable react/prop-types */

import DashboardModal from './DashboardModal';

const DeployModal = ({ open, onClose }) => (
  <DashboardModal
    open={open}
    onClose={onClose}
    title="New deployment"
    description="Trigger a deployment from a connected Git branch or existing release artifact."
  >
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-black/70">Service</label>
        <select className="h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:border-black">
          <option>api-gateway</option>
          <option>web-dashboard</option>
          <option>billing-worker</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-black/70">Branch</label>
        <input className="h-11 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-black" defaultValue="main" />
      </div>
      <div className="rounded-md border border-black/10 bg-[#f7f7f7] p-4 font-mono text-xs leading-6 text-black/58">
        <p>$ spilight deploy --service api-gateway --branch main</p>
        <p>Build cache enabled</p>
        <p>Health checks required before promotion</p>
      </div>
      <div className="flex justify-end gap-3 border-t border-black/10 pt-5">
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-black/10 px-4 text-sm font-bold">
          Cancel
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md bg-black px-4 text-sm font-bold text-white">
          Start deploy
        </button>
      </div>
    </form>
  </DashboardModal>
);

export default DeployModal;
