/* eslint-disable react/prop-types */

import DashboardModal from './DashboardModal';

const ProjectFormModal = ({ open, onClose }) => (
  <DashboardModal
    open={open}
    onClose={onClose}
    title="Create project"
    description="Create a workspace boundary for services, databases, workers, and environments."
  >
    <form className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-black/70">Project name</label>
        <input className="h-11 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-black" placeholder="core-platform" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-black/70">Region</label>
        <select className="h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:border-black">
          <option>Frankfurt, Germany - fra1</option>
          <option>Ashburn, Virginia - iad1</option>
          <option>London, United Kingdom - lhr1</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-black/70">Environment</label>
        <div className="grid gap-3 sm:grid-cols-3">
          {['Production', 'Staging', 'Preview'].map((item) => (
            <label key={item} className="flex cursor-pointer items-center gap-2 rounded-md border border-black/10 p-3 text-sm">
              <input type="radio" name="environment" defaultChecked={item === 'Production'} />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-black/10 pt-5">
        <button type="button" onClick={onClose} className="h-10 rounded-md border border-black/10 px-4 text-sm font-bold">
          Cancel
        </button>
        <button type="button" onClick={onClose} className="h-10 rounded-md bg-black px-4 text-sm font-bold text-white">
          Create project
        </button>
      </div>
    </form>
  </DashboardModal>
);

export default ProjectFormModal;
