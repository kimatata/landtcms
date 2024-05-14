"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { ProjectType, ProjectsMessages } from "@/types/project";

type Props = {
  isOpen: boolean;
  editingProject: ProjectType;
  onCancel: () => void;
  onSubmit: (name: string, detail: string) => void;
  messages: ProjectsMessages;
};

export default function ProjectDialog({
  isOpen,
  editingProject,
  onCancel,
  onSubmit,
  messages,
}: Props) {
  const [projectName, setProjectName] = useState({
    text: editingProject ? editingProject.name : "",
    isValid: false,
    errorMessage: "",
  });

  const [projectDetail, setProjectDetail] = useState({
    text: editingProject ? editingProject.detail : "",
    isValid: false,
    errorMessage: "",
  });

  useEffect(() => {
    if (editingProject) {
      setProjectName({
        ...projectName,
        text: editingProject.name,
      });

      setProjectDetail({
        ...projectDetail,
        text: editingProject.detail ? editingProject.detail : "",
      });
    } else {
      setProjectName({
        ...projectName,
        text: "",
      });

      setProjectDetail({
        ...projectDetail,
        text: "",
      });
    }
  }, [editingProject]);

  const clear = () => {
    setProjectName({
      isValid: false,
      text: "",
      errorMessage: "",
    });
    setProjectDetail({
      isValid: false,
      text: "",
      errorMessage: "",
    });
  };

  const validate = () => {
    if (!projectName.text) {
      setProjectName({
        text: "",
        isValid: false,
        errorMessage: messages.pleaseEnter,
      });

      return;
    }

    onSubmit(projectName.text, projectDetail.text);
    clear();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onCancel();
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {messages.project}
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            label={messages.projectName}
            value={projectName.text}
            isInvalid={projectName.isValid}
            errorMessage={projectName.errorMessage}
            onChange={(e) => {
              setProjectName({
                ...projectName,
                text: e.target.value,
              });
            }}
          />
          <Textarea
            label={messages.projectDetail}
            value={projectDetail.text}
            isInvalid={projectDetail.isValid}
            errorMessage={projectDetail.errorMessage}
            onChange={(e) => {
              setProjectDetail({
                ...projectDetail,
                text: e.target.value,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onCancel}>
            {messages.close}
          </Button>
          <Button color="primary" onPress={validate}>
            {editingProject ? messages.update : messages.create}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}