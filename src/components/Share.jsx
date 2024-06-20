import React, { useState } from "react";
import {
  FaHeart,
  FaShare,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaCopy,
} from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

const Share = ({ show, handleClose, storyUrl }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Share Story</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Share buttons */}
        <EmailShareButton url={storyUrl}>
          <FaEnvelope className="share-icon" />
          Email
        </EmailShareButton>
        <FacebookShareButton url={storyUrl}>
          <FaFacebook className="share-icon" />
          Facebook
        </FacebookShareButton>
        <TwitterShareButton url={storyUrl}>
          <FaTwitter className="share-icon" />
          Twitter
        </TwitterShareButton>

        {/* Copy link */}
        <div className="copy-link">
          <p>Copy this link:</p>
          <input
            type="text"
            readOnly
            value={storyUrl}
            onClick={(e) => e.target.select()}
          />
          <Button
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(storyUrl);
              toast.success("Link Copied", { position: "top-right" });
            }}
          >
            <FaCopy className="copy-icon" />
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Share;
