import { Heading, mq } from '@ensdomains/thorin'
import styled, { css } from 'styled-components'

import { APIResponse } from '../../types'

type ModalProps = {
  onDismiss: () => void
  open: boolean
  space: APIResponse | null
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(0.375rem);
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1;
    padding: 1.25rem;
    width: 100%;
    max-width: 24rem;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 1rem;
    background-color: #fff;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 0.6;
    transition: opacity 0.15s ease-in-out;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`

const Title = styled(Heading)`
  line-height: 1;

  ${mq.sm.max(css`
    font-size: 1.625rem;
  `)}

  ${mq.xs.max(css`
    font-size: 1.3125rem;
  `)}
`

const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  img {
    object-fit: cover;
    border-radius: 50%;
    box-shadow: var(--avatar-shadow);
  }
`

export function Modal({ onDismiss, open, space }: ModalProps) {
  if (!open || !space) return null

  return (
    <>
      <Wrapper>
        <div className="background" onClick={onDismiss} />
        <div className="content">
          <button className="close" onClick={onDismiss}>
            <CrossIcon />
          </button>

          <Title>{space.space}</Title>

          <Profiles>
            {space.profiles.map((profile) => (
              <div className="profile" key={profile.address}>
                <img
                  src={profile.textRecords.avatar || '/av-default.png'}
                  loading="lazy"
                  width={36}
                  height={36}
                  onError={(e) => {
                    // Sometimes avatars are set to 404s
                    e.currentTarget.src = '/av-default.png'
                  }}
                />
                <span>{profile.name || truncateAddress(profile.address)}</span>
              </div>
            ))}
          </Profiles>
        </div>
      </Wrapper>
    </>
  )
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const CrossIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 96 96"
      width="1em"
      height="1em"
      focusable="false"
      shapeRendering="geometricPrecision"
    >
      <path
        fill="currentColor"
        d="M17.757 26.243a6 6 0 1 1 8.486-8.486L48 39.515l21.757-21.758a6 6 0 1 1 8.486 8.486L56.485 48l21.758 21.757a6 6 0 1 1-8.486 8.486L48 56.485 26.243 78.243a6 6 0 1 1-8.486-8.486L39.515 48 17.757 26.243Z"
      ></path>
    </svg>
  )
}
