import { useEffect } from "react";

export function ProjectModal({ project, onClose }) {
  const open = !!project;

  useEffect(() => {
    const dialog = document.getElementById("project-modal");
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = document.getElementById("project-modal");
    if (!dialog) return;

    const onClickBackdrop = (e) => {
      const r = dialog.getBoundingClientRect();
      const inDialog =
        r.top <= e.clientY &&
        e.clientY <= r.bottom &&
        r.left <= e.clientX &&
        e.clientX <= r.right;
      if (!inDialog) onClose();
    };

    dialog.addEventListener("click", onClickBackdrop);
    return () => dialog.removeEventListener("click", onClickBackdrop);
  }, [onClose]);

  return (
    <dialog id="project-modal" className="modal">
      <div className="modal-head">
        <div>
          <b>{project?.title ?? "Project"}</b>
          <br />
          <small className="modal-tags">
            {project?.tags?.length ? project.tags.join(" • ") : ""}
          </small>
        </div>
        <button className="xbtn" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="modal-body">
        <p className="modal-desc">{project?.description ?? ""}</p>

        <div className="links">
          {project?.live ? (
            <a className="btn" href={project.live} target="_blank" rel="noreferrer">
              Live demo
            </a>
          ) : null}
          {project?.code ? (
            <a className="btn" href={project.code} target="_blank" rel="noreferrer">
              Source code
            </a>
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
