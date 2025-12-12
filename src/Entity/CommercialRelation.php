<?php

namespace App\Entity;

use App\Repository\CommercialRelationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CommercialRelationRepository::class)]
class CommercialRelation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Contact::class, inversedBy: 'commercialRelations', cascade: ['persist'])]
    private Collection $contacts;

    public function __construct()
    {
        $this->contacts = new ArrayCollection();
        $this->salesStatus = 'Prospect froid';
    }

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 50)]
    private ?string $type = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $siret = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $tvaIntra = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $website = null;

    #[ORM\Column(length: 255, nullable: false)]
    private ?string $billingAddress = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $physicalAddress = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $salesStatus = null;

    #[ORM\Column]
    private array $relationTypes = [];

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $myBenefits = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $theirBenefits = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comments = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(?string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    public function getTvaIntra(): ?string
    {
        return $this->tvaIntra;
    }

    public function setTvaIntra(?string $tvaIntra): static
    {
        $this->tvaIntra = $tvaIntra;

        return $this;
    }

    public function getWebsite(): ?string
    {
        return $this->website;
    }

    public function setWebsite(?string $website): static
    {
        $this->website = $website;

        return $this;
    }

    public function getBillingAddress(): ?string
    {
        return $this->billingAddress;
    }

    public function setBillingAddress(?string $billingAddress): static
    {
        $this->billingAddress = $billingAddress;

        return $this;
    }

    public function getPhysicalAddress(): ?string
    {
        return $this->physicalAddress;
    }

    public function setPhysicalAddress(?string $physicalAddress): static
    {
        $this->physicalAddress = $physicalAddress;

        return $this;
    }

    public function getSalesStatus(): ?string
    {
        return $this->salesStatus;
    }

    public function setSalesStatus(string $salesStatus): static
    {
        $this->salesStatus = $salesStatus;

        return $this;
    }

    public function getRelationTypes(): array
    {
        return $this->relationTypes;
    }

    public function setRelationTypes(array $relationTypes): static
    {
        $this->relationTypes = $relationTypes;

        return $this;
    }

    public function getMyBenefits(): ?string
    {
        return $this->myBenefits;
    }

    public function setMyBenefits(?string $myBenefits): static
    {
        $this->myBenefits = $myBenefits;

        return $this;
    }

    public function getTheirBenefits(): ?string
    {
        return $this->theirBenefits;
    }

    public function setTheirBenefits(?string $theirBenefits): static
    {
        $this->theirBenefits = $theirBenefits;

        return $this;
    }

    public function getComments(): ?string
    {
        return $this->comments;
    }

    public function setComments(?string $comments): static
    {
        $this->comments = $comments;

        return $this;
    }

    /**
     * @return Collection<int, Contact>
     */
    public function getContacts(): Collection
    {
        return $this->contacts;
    }

    public function addContact(Contact $contact): static
    {
        if (!$this->contacts->contains($contact)) {
            $this->contacts->add($contact);
        }

        return $this;
    }

    public function removeContact(Contact $contact): static
    {
        $this->contacts->removeElement($contact);

        return $this;
    }
}
