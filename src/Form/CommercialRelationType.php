<?php

namespace App\Form;

use App\Entity\CommercialRelation;
use App\Entity\Contact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Validator\Constraints as Assert;

class CommercialRelationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom de l\'entité',
                'attr' => ['placeholder' => ' ']
            ])
            ->add('type', ChoiceType::class, [
                'label' => 'Type de structure',
                'choices' => [
                    'Organisation' => 'Organisation',
                    'Particulier' => 'Particulier',
                ],
                'expanded' => false,
                'multiple' => false,
            ])
            ->add('relationTypes', ChoiceType::class, [
                'label' => 'Type de relation',
                'choices' => [
                    'Client / Prospect' => 'Client / Prospect',
                    'Fournisseur' => 'Fournisseur',
                    'Partenaire' => 'Partenaire',
                    'Concurrent' => 'Concurrent',
                ],
                'multiple' => true,
                'expanded' => false,
                'attr' => [
                    'placeholder' => 'Sélectionnez...',
                    'data-controller' => 'conditional-visibility',
                    'data-conditional-visibility-trigger-value' => 'Client / Prospect',
                    'data-conditional-visibility-target-selector-value' => '.sales-status-row'
                ],
                'row_attr' => [
                    'data-controller' => 'choices',
                ],
            ])
            ->add('salesStatus', ChoiceType::class, [
                'label' => 'Statut commercial',
                'choices' => [
                    'Prospect froid' => 'Prospect froid',
                    'Prospect tiède' => 'Prospect tiède',
                    'Prospect chaud' => 'Prospect chaud',
                    'Client actif' => 'Client actif',
                    'Ancien client' => 'Ancien client',
                    'Disqualifié' => 'Disqualifié',
                ],
                'row_attr' => [
                    'class' => 'sales-status-row',
                ],
            ])
            ->add('siret', TextType::class, [
                'label' => 'SIRET',
                'required' => false,
                'constraints' => [
                    new Assert\Length(['min' => 14, 'max' => 14, 'exactMessage' => 'Le SIRET doit contenir exactement 14 chiffres.']),
                    new Assert\Regex(['pattern' => '/^\d+$/', 'message' => 'Le SIRET ne doit contenir que des chiffres.'])
                ],
                'attr' => [
                    'placeholder' => ' ',
                    'data-controller' => 'input-mask',
                    'data-input-mask-pattern-value' => '000 000 000 00000'
                ]
            ])
            ->add('tvaIntra', TextType::class, [
                'label' => 'TVA Intracommunautaire',
                'required' => false,
                'constraints' => [
                    new Assert\Regex(['pattern' => '/^[A-Z]{2}[0-9A-Z]+$/', 'message' => 'Format invalide (ex: FR12345678901)'])
                ],
                'attr' => [
                    'placeholder' => ' ',
                    'data-controller' => 'input-mask',
                    'data-input-mask-pattern-value' => 'aa 00 000000000'
                ]
            ])
            ->add('website', UrlType::class, [
                'label' => 'Site Web',
                'required' => false,
                'default_protocol' => 'https',
                'attr' => [
                    'placeholder' => ' ',
                    'pattern' => 'https?://.*',
                    'title' => 'L\'URL doit commencer par http:// ou https://'
                ],
            ])
            ->add('billingAddress', TextType::class, [
                'label' => 'Adresse de facturation',
                'required' => false,
                'attr' => [
                    'data-controller' => 'address-autocomplete',
                    'placeholder' => ' '
                ]
            ])
            ->add('physicalAddress', TextType::class, [
                'label' => 'Adresse physique',
                'required' => false,
                'attr' => [
                    'data-controller' => 'address-autocomplete',
                    'placeholder' => ' '
                ]
            ])
            ->add('myBenefits', TextareaType::class, [
                'label' => 'Mes atouts / Ce que je leur apporte',
                'required' => false,
                'attr' => ['rows' => 6, 'placeholder' => ' ']
            ])
            ->add('theirBenefits', TextareaType::class, [
                'label' => 'Leurs atouts / Ce qu\'ils m\'apportent',
                'required' => false,
                'attr' => ['rows' => 6, 'placeholder' => ' ']
            ])
            ->add('comments', TextareaType::class, [
                'label' => 'Notes libres',
                'required' => false,
                'attr' => ['rows' => 6, 'placeholder' => ' ']
            ])
            ->add('contacts', CollectionType::class, [
                'entry_type' => ContactType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'label' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CommercialRelation::class,
        ]);
    }
}
