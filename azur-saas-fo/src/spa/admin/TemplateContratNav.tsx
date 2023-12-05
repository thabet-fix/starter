import React from 'react';

import { useTranslation } from 'react-i18next';
import { GoBook } from 'react-icons/go';
import { Link, useLocation } from 'react-router-dom';

import { Nav, NavGroup, NavItem } from '@/components/Nav';

import { useTemplateList } from '../contractTemplate/Template.service';

export const TemplateContratNav = () => {
  const { pathname } = useLocation();
  const isActive = (to: string) => pathname.startsWith(to);
  const { TemplateList } = useTemplateList();
  const { t } = useTranslation(['sdContract']);
  return (
    <Nav>
      <NavGroup title={t('sdContract:ContractList')}>
        {TemplateList?.data.map((template) => (
          <NavItem
            as={Link}
            key={template.id}
            to={`/admin/standard-contract/list-${template.id}`}
            isActive={isActive(`/admin/standard-contract/list-${template.id}`)}
            icon={GoBook}
          >
            {template.name}
          </NavItem>
        ))}
      </NavGroup>
    </Nav>
  );
};
