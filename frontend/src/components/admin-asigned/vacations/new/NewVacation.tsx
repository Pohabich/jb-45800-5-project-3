import './NewVacation.css'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, type ChangeEvent } from 'react'
import useService from '../../../../hooks/use-service'
import { showErrorToast } from '../../../common/show-error-toast'
import VacationsService from '../../../../services/auth-aware/admin-only/Vacations'
import type VacationDraft from '../../../../models/VacationDraft'


export default function NewVacation() {
    const [now] = useState(new Date().toISOString().split('T')[0])
    const [previewImage, setPreviewImage] = useState<string>('')
    const { register, handleSubmit, watch, setValue, formState } = useForm<VacationDraft>()
    const navigate = useNavigate()
    const vacationsService = useService(VacationsService)

    // Handle endDate value changes //
    const startDateValue = watch('startDate');
    const endDateValue = watch('endDate');
    useEffect(() => {
        if (startDateValue && endDateValue && startDateValue > endDateValue) {
            setValue('endDate', startDateValue, { shouldValidate: true });
        }
    }, [startDateValue, endDateValue, setValue])
    ///

    async function addVacation(draft: VacationDraft) {
        try {
            const selectedImage = (draft.imageUrl as unknown as FileList)?.[0]

            draft.imageUrl = selectedImage
            await vacationsService.createVacation(draft)
            goBack()
        } catch (error) {
            console.log(error)
            showErrorToast('Failed to create new vacation')
        }
    }

    function imageChanged(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
        const file = event.currentTarget.files && event.currentTarget.files[0]
        setPreviewImage(URL.createObjectURL(file!))
    }

    function goBack() {
        navigate('/vacations')
    }

    return (
        <div className="NewVacation">
            <form onSubmit={handleSubmit(addVacation)}>
                <h3 className='title'>Add vacation</h3>
                <label htmlFor="location">destination</label>
                <input type="text"  {...register('location', {
                    required: {
                        value: true,
                        message: 'Destination is required'
                    }
                })} />
                <div className='error'>{formState.errors.location?.message}</div>
                <label htmlFor="description">description</label>
                <textarea {...register('description', {
                    required: {
                        value: true,
                        message: 'Description is required'
                    }
                })} />
                <div className='error'>{formState.errors.description?.message}</div>
                <label htmlFor="startDate">start on</label>
                <input type="date" min={now} {...register('startDate', {
                    required: {
                        value: true,
                        message: 'Start date is required'
                    }
                })} />
                <div className='error'>{formState.errors.startDate?.message}</div>
                <label htmlFor="endDate">end on</label>
                <input type="date" min={startDateValue || now} {...register('endDate', {
                    required: {
                        value: true,
                        message: 'End date is required'
                    },
                    validate: value => !startDateValue || value >= startDateValue || 'End date must not be earlier than the start date'
                })} />
                <div className='error'>{formState.errors.endDate?.message}</div>
                <label htmlFor="price">price</label>
                <input type="number" min='0' max='10000' {...register('price', {
                    required: {
                        value: true,
                        message: 'Price is required'
                    },
                    min: {
                        value: 0,
                        message: "Price should be real"
                    },
                    max: {
                        value: 10000,
                        message: "Price cannot exceed 10000"
                    }
                })} />
                <div className='error'>{formState.errors.price?.message}</div>
                <label htmlFor="image">cover image</label>
                {previewImage &&
                    <img src={previewImage} />}
                <input type="file" accept="image/jpeg, image/png" {...register('imageUrl', {
                    required: {
                        value: true,
                        message: 'Image is required'
                    }
                })} onChange={imageChanged} />
                <div className='error'>{formState.errors.imageUrl?.message}</div>

                {formState.isSubmitting ? (
                    <div className="loader">Loading data...</div>
                ) : (<>
                    <button type='submit' className='btnSubmit'>Add</button>
                    <button className='btnCancel' onClick={() => goBack()}>Cancel</button>
                </>
                )}
            </form>
        </div>
    )
}