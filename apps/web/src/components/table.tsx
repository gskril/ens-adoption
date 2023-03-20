import styled, { css } from 'styled-components'

export const Table = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 2px solid #efeeee;
  background-color: #fff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
    -5px -5px 10px rgba(255, 255, 255, 0.75);
`

const rowStyles = css`
  display: grid;
  gap: 1.25rem;
  line-height: 1.3;
  font-weight: 500;
  width: fit-content;
  padding: 0.75rem 1rem;
  grid-template-columns: repeat(7, 1fr);

  & > * {
    &:nth-child(1) {
      min-width: 11rem;
    }

    &:nth-child(2) {
      min-width: 8.5rem;
    }

    min-width: 4.5rem;
  }
`

export const TableHeader = styled.div(
  ({ theme }) => css`
    ${rowStyles}

    color: ${theme.colors.textTertiary};
    font-weight: 700;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.875rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${theme.colors.borderSecondary};
  `
)

export const TableRow = styled.div(
  ({ theme }) => css`
    ${rowStyles}

    color: ${theme.colors.text};

    span {
      overflow-x: hidden;
      overflow-y: visible;
      text-overflow: ellipsis;
    }

    &:nth-child(even) {
      background-color: ${theme.colors.backgroundTertiary};
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.borderTertiary};
    }
  `
)

export const ProfileStack = styled.div`
  display: flex;

  img {
    object-fit: cover;
    border-radius: 50%;
    margin-left: -0.5rem;
    transition: margin-left 0.15s ease-in-out;
    box-shadow: var(--avatar-shadow);

    &:first-child {
      margin-left: 0 !important;
    }
  }

  @media (hover: hover) {
    &:hover,
    &:focus-visible {
      cursor: pointer;

      img {
        margin-left: -0.375rem;
      }
    }
  }
`

export const emptyTableRowStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
} as React.CSSProperties
