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

  span {
    &:first-child {
      min-width: 11rem;
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
