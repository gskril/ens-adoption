import { Heading } from '@ensdomains/thorin'
import styled from 'styled-components'

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
          <Heading>{space.space}</Heading>

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
